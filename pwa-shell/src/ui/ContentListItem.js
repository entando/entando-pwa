import React from 'react';
import { Link } from 'react-router-dom';

const ContentListItem = ({ data }) => (
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

export default ContentListItem;
