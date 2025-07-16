const express = require("express");
const UserModel = require("../Models/User");
const ensureAuthenticated = require("../Controllers/Auth");

const router = express.Router();

// GET user by email
router.get("/:email", ensureAuthenticated, async (req, res) => {
  const email = req.params.email;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH user by _id
router.patch("/:id", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});



// router.patch("/apply/:email", ensureAuthenticated, async (req, res) => {
//   const { email } = req.params;
//   const { appliedJob } = req.body;

//   if (!appliedJob || !appliedJob.jobId) {
//     return res.status(400).json({ message: "Missing job application data" });
//   }

//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const alreadyApplied = user.appliedJobs.some(
//       (job) => job.jobId.toString() === appliedJob.jobId
//     );

//     if (alreadyApplied) {
//       return res.status(400).json({ message: "Already applied to this job" });
//     }

//     // 1. Update user
//     user.appliedJobs.push({ ...appliedJob, appliedAt: new Date() });
//     await user.save();

//     // 2. Fetch job and recruiter info
//     const job = await JobModel.findById(appliedJob.jobId);
//     if (!job || !job.postedBy) {
//       return res.status(404).json({ message: "Job not found or no poster info" });
//     }

//     // 3. Send email to job poster
//     const recruiterEmail = job.postedBy; // Assuming this is the email
//     const jobLink = `http://localhost:5173/job/${appliedJob.jobId}`;

//     await sendEmail(
//       recruiterEmail,
//       `New Application for ${appliedJob.jobTitle}`,
//       `<p>Hi Recruiter,</p>
//        <p>${user.name} (<a href="mailto:${user.email}">${user.email}</a>) has applied for your job post: <strong>${appliedJob.jobTitle}</strong> at ${appliedJob.companyName}.</p>
//        <p><a href="${jobLink}">View Job</a></p>`
//     );

//     // 4. Send thank you email to user
//     await sendEmail(
//       user.email,
//       `Application Confirmation: ${appliedJob.jobTitle}`,
//       `<p>Hi ${user.name},</p>
//        <p>Thank you for applying to <strong>${appliedJob.jobTitle}</strong> at ${appliedJob.companyName}.</p>
//        <p>We’ve notified the recruiter. All the best!</p>`
//     );

//     return res.status(200).json({ message: "Applied successfully and emails sent." });

//   } catch (err) {
//     console.error("Error applying to job:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });
const { ObjectId } = require("mongodb");
const sendEmail = require("../Utils/sendEmail");

// PATCH route to apply for a job and send notifications
router.patch("/apply/:email", ensureAuthenticated, async (req, res) => {
  const { email } = req.params;
  const { appliedJob } = req.body;

  if (!appliedJob || !appliedJob.jobId) {
    return res.status(400).json({ message: "Missing job application data" });
  }

  try {
    // 1. Get user
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyApplied = user.appliedJobs?.some(
      (job) => job.jobId.toString() === appliedJob.jobId
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // 2. Save to user's appliedJobs array
    user.appliedJobs.push({ ...appliedJob, appliedAt: new Date() });
    await user.save();

    // 3. Get job details from native MongoDB driver
    const jobCollections = req.app.locals.jobCollections;
    const job = await jobCollections.findOne({ _id: new ObjectId(appliedJob.jobId) });

    if (!job || !job.postedBy) {
      return res.status(404).json({ message: "Job not found or postedBy missing" });
    }

    // 4. Email the recruiter
    await sendEmail(
  job.postedBy,
  `📩 New Application Received: ${appliedJob.jobTitle}`,
  `
    <p>Hi Recruiter,</p>

    <p><strong>${user.name}</strong> has applied to your job post: <strong>${appliedJob.jobTitle}</strong> at <strong>${appliedJob.companyName}</strong>.</p>

    <h3>🔍 Applicant Details:</h3>
    <ul>
      <li><strong>Name:</strong> ${user.name}</li>
      <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
      <li><strong>Phone:</strong> ${user.phone || 'N/A'}</li>
      <li><strong>Location:</strong> ${user.location || 'N/A'}</li>
      <li><strong>Education:</strong> ${user.education || 'N/A'}</li>
      <li><strong>Experience:</strong> ${user.experience || 'N/A'}</li>
      <li><strong>Bio:</strong> ${user.bio || 'N/A'}</li>
      <li><strong>LinkedIn:</strong> ${user.linkedin ? `<a href="${user.linkedin}">${user.linkedin}</a>` : 'N/A'}</li>
      <li><strong>GitHub:</strong> ${user.github ? `<a href="${user.github}">${user.github}</a>` : 'N/A'}</li>
      <li><strong>Portfolio:</strong> ${user.portfolio ? `<a href="${user.portfolio}">${user.portfolio}</a>` : 'N/A'}</li>
      <li><strong>Resume:</strong> ${user.resume ? `<a href="${user.resume}">View Resume</a>` : 'N/A'}</li>
    </ul>

    <p>To view your job post: <a href="http://localhost:5173/job/${appliedJob.jobId}">Click here</a></p>

    <br/>
    <p><em>This is an automated message. Please do not reply to this email.</em></p>
    <p><strong>Team JobPortal</strong></p>
  `
);


    // 5. Email the applicant (user)

    await sendEmail(
        user.email,
        `Application Confirmation: ${appliedJob.jobTitle}`,
        `
            <p>Hi ${user.name},</p>

            <p>Thank you for applying for the position of <strong>${appliedJob.jobTitle}</strong> at <strong>${appliedJob.companyName}</strong>.</p>

            <p>We’ve successfully received your application and notified the recruiter.</p>

            <p><em>This is an auto-generated email. Please do not reply.</em></p>

            <p>If the recruiter finds your profile suitable, they will get in touch with you soon via the contact details provided in your profile.</p>

            <br/>
            <p>Best of luck!</p>
            <p><strong>Team JobPortal</strong></p>
        `
    );

    // 6. Final response
    res.status(200).json({ message: "Job applied successfully and emails sent", user });
  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
