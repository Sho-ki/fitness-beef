import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from '@mui/material';
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
  const router = useRouter();

  const handleSubmit = async () => {
    const url = `http://localhost:8000/signIn`;
    const res = await axios.post(url, { email: userInput.email, password: userInput.password });
    if (res.status === 200 || res.status === 201) {
      router.push(`user/${res.data.id}/edit`);
    }


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

          <Button onClick={handleSubmit} fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            {isSignin ? 'Sign In' : 'Sign Up'}
          </Button>

          <Typography>
            {isSignin ? (
              <>
                Don’t have an account? <Link onClick={onIsSigninHandler}>Sign up</Link>{' '}
              </>
            ) : (
              <>
                Have an account? <Link onClick={onIsSigninHandler}>Sign in</Link>
              </>
            )}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Signin;
