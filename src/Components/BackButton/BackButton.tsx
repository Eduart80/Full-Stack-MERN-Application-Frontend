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
      <button className='btn btn-outline-secondary me-2' onClick={handleBack}>Back</button>
      <button className='btn btn-outline-primary' onClick={handleHome}>Home</button>
    </>
  )
}
