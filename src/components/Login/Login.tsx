import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

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
  const [isValidLogin, setIsValidLogin] = React.useState<boolean | undefined>();
  const [userInput, setUserInput] = React.useState(initialState);
  const [isSignin, setIsSignin] = React.useState(true);
  const unkokko = useRouter();
  console.log(isValidLogin);
  console.log('unkokko');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = userInput.email;
    const password = userInput.password;

    let url = isSignin ? 'signIn' : 'signUp';
    try {
      await axios
        .post(`http://localhost:8000/${url}`, {
          username,
          password,
        })
        .then((res) => {
          console.log('res', res);
          if (res.status !== 200) throw new Error();
          setIsValidLogin(true);
          unkokko.push('/user');
        });
    } catch {
      setIsValidLogin(false);
      unkokko.push(`/login`);
    }
  };

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

          <Box
            component='form'
            onSubmit={(e: any) => handleSubmit(e)}
            sx={{ mt: 1 }}
          >
            {isValidLogin === false && <div>FUCK U BITCH</div>}
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
