export enum Form {
    IncorrectCredentials = 'The email address or password is incorrect',
    Required = 'Required',
    InvalidEmail = 'Must be valid email',
    PassTooShort = 'Password must be at least of 6 characters in length',
    PassTooLong = 'Password must be at most of 100 characters in length',
    AlreadyRegisteredEmail = 'User with this email already exists.',
    NoUserWithThisEmailErrorText = 'There is no user with this email address',
    RecoveryCodeTooShortValidationErrorText = 'Recovery code must be at least 10 characters',
    RecoveryCodeTooLongValidationErrorText = 'Recovery code must be at most 20 characters',
}