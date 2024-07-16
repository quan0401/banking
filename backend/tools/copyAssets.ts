import shell from 'shelljs';
shell.cp(
  '-R',
  'src/shared/services/mail/template/forgot-password/forgot-password-template.ejs',
  'build/src/shared/services/mail/template/forgot-password/'
);
