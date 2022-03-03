//---Credentials------------------------------------------
export const user1 = {
    email: 'eglvns@telesoftas.com',
    pass: 'myPasswordIs321'
}

export const userGoogle = {
    email: 'mobile@telesoftas.com',
    pass: '---'
}

export const userFacebook = {
    email: '---',
    pass: '---'
}

export const userForgotPass = {
    email: '78nhi.test@inbox.testmail.app',
    newPass: 'newPass'
}
  
export const invalidFormatEmails = ['eglvnstelesoftas.com', 'eglvns@telesoftascom', '@telesoftas.com', '!@#$%^&*()`~', '111.@email@email.com'] 
export const invalidPass = 'myPass'
export const shortPass = '12121'
export const longPass = Math.random().toString(16).repeat(10)
export const shortRecoveryCode = '123456789'
export const longRecoveryCode = '123456789012345678901'
export const notMatchingRepeatPass = 'asd'