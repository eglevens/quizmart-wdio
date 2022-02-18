export enum Form {
    IncorrectCredentials = 'The email address or password is incorrect',
    Required = 'Required',
    InvalidEmail = 'Must be valid email',
    PassTooShort = 'Password must be at least of 6 characters in length',
    PassTooLong = 'Password must be at most of 100 characters in length',
    AlreadyRegisteredEmail = 'User with this email already exists.',
    NoUserWithThisEmail = 'There is no user with this email address',
    RecoveryCodeTooShort = 'Recovery code must be at least 10 characters',
    RecoveryCodeTooLong = 'Recovery code must be at most 20 characters',
    PasswordsMustMatch = 'Passwords must match',
    IncorrectRecoveryCode = 'The recovery code is incorrect',
}