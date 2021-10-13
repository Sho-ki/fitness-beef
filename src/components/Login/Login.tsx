import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import TextFieldInput from './TextFieldInput';
import { textMargin } from './TextFieldInput';

type State = {
  email: string;
  password: string;
};

const initialState: State = {
  email: '',
  password: '',
};

const Signin = () => {
  const [isValidLogin, setIsValidLogin] = React.useState(true);
  const [userInput, setUserInput] = React.useState(initialState);
  const [isSignin, setIsSignin] = React.useState(true);

  const handleSubmit = async () => {};

  const onEmailChangeHandler = (email: string) => {
    setUserInput((prevInput) => ({ ...prevInput, email }));
  };

  const onPasswordChangeHandler = (password: string) => {
    setUserInput((prevInput) => ({ ...prevInput, password }));
  };

  const onIsSigninHandler = () => {
    setIsSignin(isSignin ? false : true);
  };

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />

          <Typography component='h1' variant='h5'>
            {isSignin ? 'Sign in' : 'Sign up'}
          </Typography>

          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextFieldInput
              id={'username'}
              label={'User Name'}
              name={'username'}
              onChange={onEmailChangeHandler}
              margin={textMargin.NORMAL}
            />
            <TextFieldInput
              id={'password'}
              label={'Password'}
              name={'password'}
              type={'password'}
              autoComplete={'current-password'}
              onChange={onPasswordChangeHandler}
              margin={textMargin.NORMAL}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignin ? 'Sign In' : 'Sign Up'}
            </Button>
          </Box>

          <Typography>
            {isSignin ? (
              <>
                Don’t have an account?{' '}
                <Link onClick={onIsSigninHandler}>Sign up</Link>{' '}
              </>
            ) : (
              <>
                Have an account?{' '}
                <Link onClick={onIsSigninHandler}>Sign in</Link>
              </>
            )}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Signin;
