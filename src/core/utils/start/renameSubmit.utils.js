const renameSubmit = (setUserName) => {
    if(inputRenameUserName.value !== "") {
        localStorage.setItem("userName", inputRenameUserName.value) 
        setUserName(inputRenameUserName.value)
        inputRenameUserName.value = ""
        newUserHolder.classList.replace("visible" , "invisible")
    }
}

export default renameSubmit