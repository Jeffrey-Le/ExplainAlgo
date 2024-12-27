import Container from "./Container";


function Unauthorized() {

    

    return (
        <>
            <Container classes="justify-center items-center">
                <span className="text-9xl font-mono italic font-bold text-white" style={{WebkitTextStrokeColor: "black", WebkitTextStrokeWidth: "2px"}}>
                    Not Authorized
                </span>
            </Container>
        </>
    )
}

export default Unauthorized;