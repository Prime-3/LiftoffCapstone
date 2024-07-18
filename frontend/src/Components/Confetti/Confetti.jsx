import JSConfetti from "js-confetti";


function Confetti(){
    
    function handleClick(){
        const confetti = new JSConfetti()
        confetti.addConfetti()
            //    {
            //         emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸','🦄','🦝','🦽']
            //      })
    }
    return(
        <button onClick={handleClick}>Confetti</button>
    )
}

export default Confetti