const fields = document.querySelectorAll("[required]");
const form = document.querySelector("form");

form.addEventListener("submit", event => event.preventDefault());

function validateField(field) {
    function customMessage (typeError) {
        const messages = {
            text: {
                valueMissing: "Campo obrigatório"
            },
            email: {
                valueMissing: "Campo obrigatório",
                typeMismatch: "Por favor, preencha um email válido"       
            }
        }

        return messages[field.type][typeError];
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector('span.error');

        if(message) {
            spanError.classList.add('active');
            spanError.innerHTML = message;
        } else {
            spanError.classList.remove('active');
            spanError.innerHTML = "";
        }
    }

    function verifyErrors() {
        let foundError = false;

        for (const error in field.validity) {
            if(field.validity[error] && !field.validity.valid) {
                console.log(error);
                foundError = error;
            }
        }

        return foundError;
    }

    return function() {
        const error = verifyErrors();
        
        if(error) {
            const message = customMessage(error);
            field.style.borderColor = "red";
            setCustomMessage(message);
        } else {
            field.style.borderColor = "green";
            setCustomMessage();
        }
    }
}

function customValidation(event) {
    const field = event.target;
    const validation = validateField(field);

    validation();
}

fields.forEach(field => {
    field.addEventListener("invalid", event => {
        event.preventDefault();
        customValidation(event);
    });

    field.addEventListener("blur", customValidation);    
});