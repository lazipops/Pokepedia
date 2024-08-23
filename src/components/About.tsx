export default function About() {

  return (
    //object tag here for rendering resume file
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <img
              src="./src/assets/pfp.jpg"
              alt="Me"
              className="img-thumbnail"
            />
          </div>
          <div className="col-sm">
            <p className="text-justify">
              Hello! Welcome to my website. I am a dedicated and passionate web
              developer that loves to teach others the principals of web
              development and coding while also learning new tips and tricks from others.<br/><br/>

              If you are interested in wanting to use my skillset for your
              business, please send me an email at kurtis.charlton@outlook.com.
              My resume can be found on this site for you to view along with the
              ability to download it. Thank you for your time :)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
