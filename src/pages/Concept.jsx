import React from 'react';
import { Link } from 'react-router-dom';



const Concept = () => {
    
    return (
        <div className="concept-page flex flex-col justify-center">
                        
            <section id="section1" className="flex flex-wrap justify-around">
                <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/02/juicy-58-plants.png?lossy=1&strip=1&webp=1" />
                <div id="main-text" className="text-xl my-auto">
                    <h1 className="text-gray-900">Cultiver la connaissance,<br/>Partager.</h1>
                    <p className="text-gray-400 text-justify">
                       Jardinier du dimanche ou permaculteur avéré, semez votre graine à l'édifice en partageant votre savoir faire avec d'autres passionnés du rateau.
                    </p>

                    <div className="flex flex-wrap mt-5">
                        <Link to="/" className="main-btn mx-5 mt-5">
                            Parcourir le site
                        </Link>

                        <Link to="/gardens/new" className="secondary-btn mx-5">
                            Créez votre jardin
                        </Link>
                    </div>
             
                </div>
            </section>

            <section id="section2" className="flex flex-wrap justify-around">
                <div className="concept-card flex flex-col flex-wrap">
                    <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/03/follow-me-04-nature.png?lossy=1&strip=1&webp=1" className="card-img"/>
                    <p className="card-text text-justify mt-2 text-lg text-gray-500">
                        Apprenez en prenant modèle sur des jardins fructueux similaires au vôtre.
                    </p>
                </div>
                <div className="concept-card">
                    <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/05/funny-bunny-17-meditation.png?lossy=1&strip=1&webp=1" className="card-img"/>
                    <p className="card-text text-justify mt-2 text-lg text-gray-500">
                        Augmentez vos récoltes en apprenant comment prendre soins vos plantations.
                    </p>
                </div>
                <div className="concept-card">
                    <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/03/smartsharp-14-upgrade.png?lossy=1&strip=1&webp=1" className="card-img"/>
                    <p className="card-text text-justify mt-2 text-lg text-gray-500">
                        Bénéficiez de l'aide et des conseils de passionnés ou de professionnels.
                    </p>
                </div>
            </section>

            <img className="background1" src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/02/handsome-81-aquarium.png?lossy=1&strip=1&webp=1" />

            <section id="section3" className="flex flex-wrap justify-around">
                <img src="https://image.freepik.com/free-vector/growing-vegetables-abstract-concept-vector-illustration-home-gardening-beginners-planting-ground-organic-food-salad-seeds-container-garden-eat-fresh-food-abstract-metaphor_335657-1659.jpg" />

                <div className="section-text my-auto flex flex-col justify-center">
                    <h1 className="text-gray-900 text-center">
                        Amateurs
                    </h1>
                    <h4 className="text-gray-500 mt-3">
                        Ne vous prenez plus le choux.
                    </h4>
                    <p className="text-gray-500 text-lg mt-2 text-justify">
                        Vous souhaitez commencer un potager mais craignez le génocide de tomates ?
                        Aucun problème ! 
                        Sur la Main Verte, vous pouvez trouver des jardins cultivés dans les mêmes conditions que le vôtres,
                        et comprendre comment s'adapter à votre environnement pour augmenter vos récoltes.
                    </p>
                    <Link to="/register" className="cta font-bold">
                        Nous rejoindre
                    </Link>
                </div>
            </section>

            <img className="background1" src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/02/handsome-82-tropic.png?lossy=1&strip=1&webp=1" />

            <section id="section4" className="flex flex-wrap justify-around">
                <div className="section-text my-auto flex flex-col justify-center">
                    <h1 className="text-gray-900 text-center">
                        Professionnels
                    </h1>
                    <h4 className="text-gray-500 mt-3">
                        Semer vos connaissances.
                    </h4>
                    <p className="text-gray-500 text-lg mt-2 text-justify">
                        Vous voulez encourager les jardiniers amateurs, et offrir vos bons conseils pour faire germer de nouvelles pousses ?
                        Partager votre jardin sur la Main Verte, et postez-y toutes vos bonnes pratiques ! 
                        La Main Verte vous permettra également de prendre en note sur un agenda toutes vos activités, et ainsi vous aide
                        à attendre le moment idéal pour la semi.
                    </p>
                    <Link to="/register" className="cta font-bold">
                        Nous rejoindre
                    </Link>
                </div>

                <img src="https://image.freepik.com/free-vector/cultivating-soil-abstract-concept-vector-illustration-gardening-growing-vegetables-tilling-ground-remove-weeds-loosening-soil-air-water-nutrients-penetration-abstract-metaphor_335657-1658.jpg" />
            </section>

        </ div>
    )
}

export default Concept;