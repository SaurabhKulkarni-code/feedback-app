import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  function handleChange(event) {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be atleast 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }

    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim().length > 10) {
      const newFeedBack = {
        text: text,
        rating: rating,
      };
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedBack);
      } else {
        addFeedback(newFeedBack);
      }

      setText("");
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2> How would you rate our Serviece? </h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleChange}
            type="text"
            value={text}
            placeholder="Write a Review"
          />
          <Button type="submit" isDisabled={btnDisabled}>
            send
          </Button>
        </div>
        {message && <div className="message"> {message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
