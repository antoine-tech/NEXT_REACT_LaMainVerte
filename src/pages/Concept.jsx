import React from 'react';
import { Link } from 'react-router-dom';

const Concept = () => {
    
    return (
        <div className="concept-page flex flex-col justify-center">
            <section id="section1" className="flex flex-wrap justify-around">
                <img src="https://image.freepik.com/free-vector/weed-control-abstract-concept-illustration-gardening-maintenance-pest-control-spray-chemicals-weed-killer-lawn-care-service-herbicide-pesticide_335657-585.jpg" />
                <div id="main-text" className="text-xl my-auto">
                    <h1 className="text-gray-900">Cultiver la connaissance,<br/>Partager.</h1>
                    <p className="text-gray-400">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, numquam et eligendi ab maxime excepturi ut ex perferendis, quasi exercitationem, aliquam reiciendis explicabo! Sunt at perferendis aperiam, a laboriosam corporis?
                    </p>
                    <button className="main-btn">
                        Parcourir le site
                    </button>
                </div>
            </section>

            <section id="section2" className="flex flex-wrap justify-around">
                <div className="concept-card flex flex-col flex-wrap">
                    <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/03/follow-me-04-nature.png?lossy=1&strip=1&webp=1" className="card-img"/>
                    <p className="card-text text-center mt-2 text-lg text-gray-500">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
                <div className="concept-card">
                    <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/05/funny-bunny-17-meditation.png?lossy=1&strip=1&webp=1" className="card-img"/>
                    <p className="card-text text-center mt-2 text-lg text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div className="concept-card">
                    <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/03/smartsharp-14-upgrade.png?lossy=1&strip=1&webp=1" className="card-img"/>
                    <p className="card-text text-center mt-2 text-lg text-gray-500">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                </div>
            </section>

            <section id="section3" className="flex flex-wrap justify-around">
                <img src="https://image.freepik.com/free-vector/flowers-concept-illustration_114360-4286.jpg" />

                <div className="section-text my-auto flex flex-col justify-center">
                    <h1 className="text-gray-900 text-center">
                        Amateurs
                    </h1>
                    <p className="text-gray-500 text-lg mt-2 text-center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, numquam et eligendi ab maxime excepturi ut ex perferendis, quasi exercitationem, aliquam reiciendis explicabo! Sunt at perferendis aperiam, a laboriosam corporis?
                    </p>
                    <button className="cta font-bold">
                        Nous rejoindre
                    </button>
                </div>
            </section>

            <section id="section4" className="flex flex-wrap justify-around">
                <div className="section-text my-auto flex flex-col justify-center">
                    <h1 className="text-gray-900 text-center">
                        Professionnels
                    </h1>
                    <p className="text-gray-500 text-lg mt-2 text-center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, numquam et eligendi ab maxime excepturi ut ex perferendis, quasi exercitationem, aliquam reiciendis explicabo! Sunt at perferendis aperiam, a laboriosam corporis?
                    </p>
                    <button className="cta font-bold">
                        Nous rejoindre
                    </button>
                </div>

                <img src="https://image.freepik.com/free-vector/cultivating-soil-abstract-concept-vector-illustration-gardening-growing-vegetables-tilling-ground-remove-weeds-loosening-soil-air-water-nutrients-penetration-abstract-metaphor_335657-1658.jpg" />
            </section>

        </ div>
    )
}

export default Concept;