# Bare custom AWS Amplify Auth flow styled

Custom AWS Amplify, React JS and TypeScript sign in, sign up, user confirmation, password recovery and PWA install button.

## Clone the repo

Delete the amplify folder and the aws-exports.js file.

If you never have worked with AWS Amplify.

https://docs.amplify.aws/

`amplify init`

Enter a name for the project bareauthstyled
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path: src
? Distribution Directory Path: build
? Build Command: npm run-script build
? Start Command: npm run-script start
...
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: default

`amplify add auth`

Do you want to use the default authentication and security configur
ation? Default configuration
Warning: you will not be able to edit these selections.
How do you want users to be able to sign in? Username
Do you want to configure advanced settings? No, I am done.

`amplify push`

Are you sure you want to continue? Yes

`yarn install`

Happy hacking :)
