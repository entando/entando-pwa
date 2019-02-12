import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom'

export default class ContentListItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <li>
        <Link to={`/${data.contentType}/${data.id}`}>
          <div>
            {data.title}
          </div>
          <div>            
            <span className="item-footer">
            </span>            
          </div>
        </Link>
      </li>
    );
  }
}
