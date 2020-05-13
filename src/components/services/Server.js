import { BASE_URL } from "../constants/Constants";

const requestEvents = () => {
    const response = fetch(`${BASE_URL}events/bydate/0/999`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                dateFrom: 1585688400000,
                dateTo: 1601499600000
            }
        )
    })
        .then(response => {
            if(response.status !== 200) {
                if (response.status === 400) {
                    throw new Error(`Input validation error, received ${response.status}`);
                } else {
                    throw new Error(`Could not fetch ${BASE_URL}, received ${response.status}`);
                }
            }
            return response.json();
        });
    return response;
};

const ticketsInformation = (eventId) => {
    const response = fetch(`${BASE_URL}events/rest/${eventId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if(response.status !== 200){
                throw new Error(`Could not fetch data`);
            }
            return response.json();
        });
    return response;
};

const sceneInformation = (eventId) => {
    const response = fetch(`${BASE_URL}event/${eventId}/${false}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if(response.status !== 200){
                if(response.status === 404){
                    throw new Error(`Event with ${eventId} does not exist`);
                }
                throw new Error(`Could not fetch data`);
            }
            return response.json();
        });
    return response;
};

const bookTicket = (eventId, lockedSeats) => {
    const response = fetch(`${BASE_URL}event/book`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eventId: eventId,
            lockedSeats: lockedSeats
            }
        )
    })
        .then(response => {
            if(response.status !== 200){
                throw new Error(`Could not fetch data`);
            }
        });
    return response;
};

const userRegistration = (user) => {
    console.log("server ", user);
    const response = fetch(`${BASE_URL}user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log(response);
            if(response.status !== 200){
                if(response.status === 400) {
                    throw new Error(`Input validation error, received ${response.status}`);
                } else {
                    throw new Error(`Could not fetch data`);
                }
            }
        });
    return response;
};

const handleSubmitLogin = (email, password) => {
    const response = fetch(`${BASE_URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { email, password })
    })
        .then(response => {
            if(response.status !== 200) {
                if (response.status === 400) {
                    throw new Error(`Input validation error, received ${response.status}, please check the
                        following fields: email. Email is required and its length should be between 3 and 100 characters.`);
                } else if (response.status === 404) {
                    throw new Error(`User with email ${email} does not exist, received ${response.status}`);
                } else {
                    throw new Error(`Could not fetch ${BASE_URL}, received ${response.status}`);
                }
            }
            return response.json();
        });
    return response;
};

const recoverPassword = (email) => {
    const response = fetch(`${BASE_URL}user/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { email }),
        withCredentials: true})
        .then(response => {
            if(response.status !== 200) {
                if (response.status === 400) {
                    throw new Error(`Input validation error, received ${response.status}, please check the
                        following fields: email. Email is required and its length should be between 3 and 100 characters.`);
                } else if (response.status === 404) {
                    throw new Error(`User with email ${email} does not exist, received ${response.status}`);
                } else {
                    throw new Error(`Could not fetch ${BASE_URL}, received ${response.status}`);
                }
            }
            return `Success, please check your email, received ${response.status}`;
        });
    return response;
};

export { requestEvents, ticketsInformation, sceneInformation, bookTicket, userRegistration, handleSubmitLogin, recoverPassword };