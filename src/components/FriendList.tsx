import React from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function FriendList(props: reduxStore) {
  return (
    <div className="friendListBox">
      <ListGroup variant="flush">
        {props.user.associates.length > 0 ? (
          props.user.associates.map((friend: object, i) => (
            <ListGroup.Item key={i} className="friendListing">
              friend {i}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="noListings">
            No Friends Yet!
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default connect(mapStateToProps)(FriendList);
