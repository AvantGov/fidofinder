
export const createLocalSession = (current) => {
    localStorage.setItem('sessionID', current.sessionID.payload)
    localStorage.setItem('timestamp', current.timestamp.payload)
    localStorage.setItem('name', current.name.payload)
    localStorage.setItem('email', current.email.payload)
    localStorage.setItem('status', current.status.payload)
    localStorage.setItem('accountDetails', current.accountDetails.payload)
    localStorage.setItem('expired', false)
}

export const initSession = () => {
    localStorage.setItem('sessionID', '')
    localStorage.setItem('timestamp', 0)
    localStorage.setItem('name', '')
    localStorage.setItem('email', '')
    localStorage.setItem('status', false)
    localStorage.setItem('expired', false)
    localStorage.setItem('accountDetails', {})
    console.log("local storage session init")
}

export const deleteLocalSession = () => {
    localStorage.setItem('sessionID', '')
    localStorage.setItem('timestamp', 0)
    localStorage.setItem('name', '')
    localStorage.setItem('email', '')
    localStorage.setItem('status', false)
    localStorage.setItem('expired', true)
    localStorage.setItem('accountDetails', {})
    console.log("local storage session deleted")
} 
