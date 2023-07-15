'use client'

import {useState} from 'react'

import { Cookies } from 'react-cookie'

export default function LoggedInPage(props:any)
{
    const audioPlayer = new Audio('./mamaSound.wav')

    console.log(props)

    // const testCookie = new Cookies().get("currentTest")

    const [testing, setTesting] = useState((props.testIsSet) ? props.testData:false)


    const [pitch1,setPitch1] = useState((props.testIsSet)? props.testData.left: 1)
    const [pitch2,setPitch2] = useState((props.testIsSet)? props.testData.right: 1)

    const [sing1, setSing1] = useState(false)
    const [sing2, setSing2] = useState(false)
    
    const [correct, setCorrect] = useState(0)
//1 correct 
//2 incorrect
    

    

    const [username, setUsername] = useState(props.data.username)

    // const playSong = () =>
    // {
    //     audioPlayer.playbackRate = 0.5; 
    //     audioPlayer.play();
    // }

    const [state, setState] = useState((props.testIsSet)?"deciding": "waiting");
    function playAudio(){
        return new Promise(res=>{
            audioPlayer.play()
            audioPlayer.onended = res
        })
      }
    

    const SendCorrect = async (guess:number) =>
    {
        const request = await fetch('/api/guessTest',
        {
            method:"POST",
            body:JSON.stringify({
                guessId: guess
            })
        })
        const data = await request.json();
        if(data.fail)
        {
            return; 
        }

        if(data.correct)
        {
            setCorrect(1)
        }
        else 
        {
            setCorrect(2)
        }
        setState("waiting")
        
    }

    const LeftPitch = () =>
    {
        SendCorrect(1)
    }
    
    const RightPitch = () =>
    {
        SendCorrect(3)
    }

    const SamePitch = () =>
    {
        SendCorrect(2)
    }

    const getRandomPitch = () =>
    {
        return (Math.floor(Math.random()*4) * 0.25) + 0.5; 
    }

    const beginTest = async ()=>
    {

        if(testing) return;

        const res = await fetch('/api/createNewTest',
        {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            }
        })

        const data = await res.json()

        if(data.fail) return; 

        
        
        setState("playing")

        setSing1(true); 
        setPitch1(data.left);
        audioPlayer.playbackRate = pitch1;
        await playAudio();
        setSing1(false); 
        setSing2(true); 
        setPitch2(data.right);
        audioPlayer.playbackRate = pitch2;
        await playAudio();

        setState("deciding")
        setSing2(false); 
        
    }

    const Play1 = async ()=>
    {
        setSing1(true); 
        audioPlayer.playbackRate = pitch1;
        await playAudio();
        setSing1(false); 
    }

    const Play2 = async () =>
    {
        setSing2(true); 
        audioPlayer.playbackRate = pitch2;
        await playAudio();
        setSing2(false); 
    }

    const Logout = ()=>
    {
        fetch('/api/logout',
        {
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
        }}).then(data=>
            data.json()).then(data => window.location.href = "/")
    }
    console.log(username)


    return (
        <main className="flex min-h-screen flex-col items-center p-12">

            <div className='w-full rounded-2xl bg-[#4692E8] p-4 text-white text-center'>

                <h3 className='font-bold text-[4vw]'>TuneSense Fun!</h3>
                <h3 className='font-bold text-[2vw]'>Welcome Back <span className='italic'>{username}</span></h3>
                <button onClick={Logout} className='underline'>Log Out</button>

            </div>
            <div className='mt-12 w-full rounded-2xl bg-[#4692E8] p-8 text-white text-center'>

                <h3 className='text-[2vw]'>
                    {(correct ==1 ) ? "Correct! Keep Going!": (correct ==2 ) ? "Incorrect! Try Again!" :""}
                </h3>
                
                <div className='grid grid-cols-2 w-full'>
                    <img className='w-2/5 relative left-1/2 translate-x-[-50%]' src={(sing1)?'mamama1sing.png' :'mamama1.png'}/>
                    <img className='w-2/5 relative left-1/2 translate-x-[-50%]'src={(sing2)?'mamama2sing.png' :'mamama2.png'}/>
                
                </div>

                {(state == "waiting")
                    ? 
                    <button onClick={beginTest} className='bg-[#42B0E6] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-4 rounded-2xl ml-4'>
                        Start Test
                    </button> :
                    (state == "deciding")?
                    <div>

                        <div className='grid grid-cols-2 grid-rows-1 w-full '>
                            <button onClick={Play1} className='bg-[#42B0E6] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-4 rounded-2xl ml-4'>
                                Play Sound 1 Again
                            </button>
                            <button onClick={Play2} className='bg-[#42B0E6] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-4 rounded-2xl ml-4'>
                                Play Sound 2 Again
                            </button>
                            
                        </div>

                <h3 className='text-[2vw]'>Which Audio Has The Greatest Pitch?</h3>
                        <div className='grid grid-cols-3 grid-rows-1 w-full mt-2 relative  '>
                            <button onClick={LeftPitch} className='bg-[#42B0E6] text-[2vw] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-2 rounded-2xl ml-4'>
                                Left is Higher
                            </button>
                            <button onClick={SamePitch} className='bg-[#42B0E6] text-[2vw] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-2  rounded-2xl ml-4'>
                                Same
                            </button>
                            <button onClick={RightPitch} className='bg-[#42B0E6] text-[2vw] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-2 rounded-2xl ml-4 '>
                                Right is Higher
                            </button>
                            
                        </div>
                    </div>
                    :
                    <>
                    </>}       

            </div>

        </main>
    )
}