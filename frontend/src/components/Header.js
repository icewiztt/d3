import {Navbar,Container} from 'react-bootstrap';

const Header = ({setSelectedImage, setBase64Str}) =>{
    return (
        <>
        <Navbar bg='info' variant="light" expand="lg" collapseOnSelect="true">
        <Container> 
            <Navbar.Brand href="/">Distracted Driver Detection</Navbar.Brand>
        </Container>
        </Navbar>
        </>
    )
}

export default Header;