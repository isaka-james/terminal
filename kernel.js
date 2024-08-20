document.addEventListener('DOMContentLoaded', () => {

    const commandArea = document.getElementById('command-area');
    const files = ['skills.txt','languages.txt','frameworks.txt','help.txt','me.txt'];

    // Function to render file content in the command area
    function getFileContent(filename){
        switch(filename){
            case 'skills.txt':
                return 'Web Development, Application Development, Data Science, Machine Learning, Low Code Development, Design, UI/UX, SECurity, Cybersecurity, Blockchain';
            case 'languages.txt':
                return 'JavaScript, TypeScript, Python, Java, C++, Rust, Go, Kotlin, Dart, PHP, SQL, NoSQL, Bash, Docker, Ansible, AWS, Postgres, MongoDB';
            case 'frameworks.txt':
                return 'ReactJS(Library haha), Angular, Django, Gin, Flask, Springboot, Express, Actix, JakartaEE, Laravel, Figma, Flutter';
            case 'help.txt':
                return 'Type the command followed by a space and press Enter to execute it. For example, "ls", "cat skills.txt", "help".';
            case 'me.txt':
                return 'Name:Isaka-James\nAge:Young\nLocation:Tanzania';
            default:
                return null;
        }
    }

    // Function to simulate command execution and generate output
    function executeCommand(command) {
        let output = '';

        if (command.trim().startsWith('cat')) {
            const fileName = command.trim().split(' ')[1];
            const fileContent = getFileContent(fileName);
            if (fileContent !== null) {
                output = fileContent;
            } else {
                output = `File not found: ${fileName}`;
            }
        }else{
            switch (command.trim()) {
                case 'help':
                    output = 'Type \'ls\' to list all files\nType \'cat <filename>\' to view the content of files\nType \'date\' to display current date and time';
                    break;
                case 'date':
                    output = new Date().toLocaleString();
                    break;
                case 'ls':
                    output = files.sort().join('\n');;
                    break;
                default:
                    output = `Command not found: ${command} (Type 'help' for more information)`;
            }
        }
        return output;
    }

    // Function to handle command execution on Enter key press
    function handleEnterPress(event) {
        
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission

            const currentCommandDiv = event.target.closest('.command');
            const commandInput = currentCommandDiv.querySelector('.command-input');
            const commandOutput = currentCommandDiv.querySelector('.output');

            const command = commandInput.value.trim();
            if (command) {
                if(command.trim().toLowerCase()=='clear') {
                    clearText();
                    return;
                }
                const output = executeCommand(command);

                // Display the output
                const outputDiv = document.createElement('div');
                outputDiv.classList.add('output');
                outputDiv.textContent = output;
                commandOutput.appendChild(outputDiv);

                // Disable the previous input field
                commandInput.disabled = true;

                insertNewDiv();
            }
        }
    }

    function clearText() {
        commandArea.innerHTML = '';
        insertNewDiv();
    }

    function insertNewDiv(){
        const initialCommandDiv = document.createElement('div');
        initialCommandDiv.classList.add('command');
        initialCommandDiv.innerHTML = `
        <div class="line">
            <div class="prompt-text">
                <div>
                    <span style="color: #5bb6a5;">┌──(</span>
                    <span style="color: #277bf7;font-weight: 700">guest㉿isakajames</span>
                    <span style="color: #5bb6a5;">)-[</span><span style="color: white; font-weight: 800">~</span><span style="color: #5bb6a5;">] </span>
                </div>
            </div>
            <div class="prompt-line">
                <div>
                    <span style="color: #5bb6a5;">└─</span>
                    <span style="color: #277bf7;font-weight: 700">$</span>
                </div>
                <input type="text" class="command-input">
            </div>
            <div class="output"></div>
        </div>
        `;
        
        commandArea.appendChild(initialCommandDiv);
    
        // Ensure focus after the DOM has updated
        setTimeout(() => {
            const initialInput = initialCommandDiv.querySelector('.command-input');
            initialInput.focus();
            initialInput.addEventListener('keydown', handleEnterPress);
        }, 0);
    
        // Scroll to the bottom
        commandArea.scrollTop = commandArea.scrollHeight;
    }
    
    clearText();
});
