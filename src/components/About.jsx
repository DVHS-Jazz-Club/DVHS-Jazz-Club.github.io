const About = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="section-header">
                    <h2>About Our Jazz Club</h2>
                    <p>Discovering the art of jazz through collaboration, creativity, and community</p>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <h3>Our Mission & Vibe</h3>
                        <p>The Dougherty Valley High School Jazz Club is a vibrant, close-knit community of student musicians passionate about jazz. We focus on teaching music theory and improvisation, creating an environment where creativity flourishes and friendships are forged through the universal language of music.</p>
                        <p>It's not a huge club, and we like it that way. Everyone who shows up becomes part of our musical family. Whether you're a seasoned musician or just starting, our club welcomes all skill levels to learn, jam, and grow with us.</p>
                        <div className="features">
                            <div className="feature">
                                <i className="fas fa-book-reader"></i>
                                <h4>Music Theory & Improv</h4>
                                <p>Learn the fundamentals and the art of spontaneous creation</p>
                            </div>
                            <div className="feature">
                                <i className="fas fa-users"></i>
                                <h4>Community Feel</h4>
                                <p>Join a small, welcoming group of passionate musicians</p>
                            </div>
                            <div className="feature">
                                <i className="fas fa-star"></i>
                                <h4>Performance Opportunities</h4>
                                <p>Share your talent at school and in the community</p>
                            </div>
                        </div>
                    </div>
                    <div className="about-image">
                        <div className="image-placeholder">
                            <i className="fas fa-image"></i>
                            <p>Jazz Club Rehearsal</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About; 