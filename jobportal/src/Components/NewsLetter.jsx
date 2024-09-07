import React from 'react'
import { FaEnvelopeOpenText ,FaRocket} from 'react-icons/fa6';

const NewsLetter = () => {
  return (
    <div>
        <div>
            <h3 className='text-lg font-bold mb-6 flex items-center flex-wrap gap-2'>
               <FaEnvelopeOpenText/>
                 Email me for Job 
            </h3>
            
                <p className='flex text-primary/75 text-base mb-4 '>ksfdhbiawjhbianeisjviaieedfbdivbe</p>
                <div>
                    <input type="email" name='email' id='email' placeholder='email123@gmail.com'
                      className=' w-full block py-2 pl-3 border focus:outline-none'/>
                      <input type='submit' value={"Subscribe"} className=' w-full block py-2 pl-3 border focus:outline-none bg-blue-500 rounded-sm text-white cursor-pointer font-semibold'/>
                </div>
            
        </div>
        <div classnName='py-4'>
            <h3 className='text-lg font-bold mb-5 mt-10 flex items-center gap-2'>
               <FaRocket/>
                Get Noticed Faster
            </h3>
            
                <p className='flex text-primary/75 text-base mb-4'>address</p>
                <div>
                    <input type="email" name='email' id='email' placeholder='email123@gmail.com'
                      className=' w-full block py-2 pl-3 border focus:outline-none'/>
                      <input type='submit' value={"Subscribe"} className=' w-full block py-2 pl-3 border focus:outline-none bg-blue-500 rounded-sm text-white cursor-pointer font-semibold'/>
                </div>
            
        </div>
    </div>
  )
}

export default NewsLetter