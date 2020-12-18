import status404 from "../../assets/img/404.jpg";

const Error404 = () =>
{
    return (
        <>
        <img className="h-80vh mx-auto" src={status404} alt="404 error" />

        <h1 className="text-center">404: La page demandée n'existe pas</h1>
      </>
    )
}

export default Error404;