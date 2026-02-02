import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    const back = useNavigate()

    const handleHome=()=>{
        back('/')
    }
    const handleBack=()=>{
        back(-1)
    }
  return (
    <>
      <button className='btn' onClick={handleHome}>Home</button>
      <button className='btn' onClick={handleBack}>Go Back</button>
    </>
  )
}
