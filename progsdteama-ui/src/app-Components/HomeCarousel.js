import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import carousel from './images/Carousel1.jpg'
import carouse2 from './images/Carousel2.jpg'
import carouse3 from './images/Carousel3.jpg'

function HomeCarousel() {
  return (
    <Carousel variant="dark">
      <Carousel.Item><div className="back-image" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '75%',
                        width: '100%'}}>
      <Image rounded fluid center
                        src={carousel}
                        className="d-inline-block align-top"
                      
                        height= "50%"
        />
        </div>
        <Carousel.Caption>
        <h5>Yes, days can be exhausting!!</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className="back-image" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '75%',
                        width: '100%'}}>
      <Image rounded fluid center
                        src={carouse2}
                        className="d-inline-block align-top"
                      
                        height= "50%"
        />
        </div>
        <Carousel.Caption>
        <h5>why don't you come along??</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className="back-image" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '75%',
                        width: '100%'}}>
      <Image rounded fluid center
                        src={carouse3}
                        className="d-inline-block align-top"
                      
                        height= "50%"
        />
        </div>
        <Carousel.Caption>
        <h5>You'll love it!!</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;