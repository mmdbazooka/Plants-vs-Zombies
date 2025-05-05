const changeSrcForCherryBomb = (e) => {
    e.target.previousElementSibling.src = "../src/assets/images/plants/giphy.gif"
    e.target.previousElementSibling.className = "mix-blend-screen";
    setTimeout(() => { 
        e.target.previousElementSibling.src = "" 
        e.target.previousElementSibling.className = "scale-[80%]";
    }, 400);
}

export default changeSrcForCherryBomb