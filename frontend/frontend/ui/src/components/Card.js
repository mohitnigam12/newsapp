// Card.js
import Card from 'react-bootstrap/Card';

function Cards(props) {
  return (
    <Card style={{ width: "18rem", maxHeight: "400px",margin:"10px" }}>
      <Card.Img variant="top" src={props.item.urlToImage}  style={{ height: "150px", objectFit: "fill" }} />
      <Card.Body>
        <Card.Title>{props.item.title}</Card.Title>
        <Card.Text>
          {props.item.description}
        </Card.Text>
        url <a href={props.item.url}>{props.item.url}</a>

        <a href={props.item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
          {props.item.url}
        </a>
      </Card.Body>
    </Card>
  );
}

export default Cards;
