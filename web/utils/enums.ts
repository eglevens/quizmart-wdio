//---Headers-----------------------------------------
export enum Header {
    SignIn = 'Sign in',
    Register = 'Register',
    Discover = 'Discover',
    ResetPass = 'Reset your password',
    Landing = 'Play and create Quiz content',
    TermsAndConditions = 'Terms and Conditions',
    PrivacyPolicy = 'Privacy Policy',
    Join = 'Join Game',
    Play = 'Play',
    Create = 'Create Your Quiz',
    Collections = 'Collections',
    Credits = 'My credits',
}

export enum Button {
    SignInWithEmail = 'Sign in with email',
    RegisterTab = 'Register',
    RegisterWithEmail = 'Register with email',
    SignIn = 'Sign in',
    Register = 'Sign up',
    SendRecoveryCode = 'Send recovery code',
    NextWithRecoveryCode = 'Next',
    DonePasswordReset = 'Done',
    ContinueWithFacebook = 'Continue with Facebook',
    ContinueWithGoogle = 'Continue with Google',
    SaveQuiz = 'Save Quiz',
    Cancel = 'Cancel',
    Add = 'Add',
    DiscoverMore = 'Discover More',
    ConfirmEmail = 'Confirm Email'
}

export enum Link {
    TermsAndConditions = 'terms-and-conditions',
    SignUp = '/sign-up',
    SignIn = '/sign-in',
    ResetPass = '/reset-password',
    //header buttons
    Discover = '/discover',
    Join = '/',
    Play = '/play',
    Create = '/library/quiz/add',
    Collections = '/collections'
}

export enum Input {
    Email = 'email',
    Password = 'password',
    RepeatPass = 'passwordRepeat',
    RecoveryCode = 'recoveryCode',
    Search = 'searchInput',
    QuizCreationTitle = 'title',
    QuizCreationDescription = 'description',
    QuizCreationTags = 'tags',
    QuizCreationQuestion = 'questions[0].text',
    QuizCreationAnswer = 'questions[0].answers.textAnswers[0].value',
}

export enum Path {
    Discover = '/discover',
    Join = '/',
    Play = '/play',
    Create = '/library/quiz/add',
    Collections = '/collections',
}

export enum QuizCreation {
    Title = 'brown lazy fox',
    Description = 'The quick brown fox jumps over the lazy dog', 
    Tags = 'pangram',
    Question = 'The quick brown fox jumps over the lazy dog - this is the sentence that contains...',
    Answer = 'all of the letters of the English alphabet.',
}

export enum Messages {
    QuizCreated = 'Quiz created',
    QuizDeleted = 'Quiz deleted'
}