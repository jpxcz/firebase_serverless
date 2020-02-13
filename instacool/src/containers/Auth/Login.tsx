import React from 'react';
import { Link } from 'react-router-dom'
import Card from '../../components/Card';
import Container from '../../components/Container';
import Input from '../../components/Input'
import Button from '../../components/Button';
import Title from '../../components/Title';
import Center from '../../components/Center';

export default class Login extends React.Component {

  public render() {
    return (
      <Container center={true}>
        <Card>
          <Title>Login</Title>
          <Input placeholder="Usuario" label="Correo" />
          <Input placeholder="Password" label="Password" />
          <Button block={true}>Enviar</Button>
          <Center>
            <Link to='register'>Registrase</Link>
          </Center>
        </Card>

      </Container>
    )
  }
}