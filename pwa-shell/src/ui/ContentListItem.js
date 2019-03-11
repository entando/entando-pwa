import React from 'react';
import { Link } from 'react-router-dom';

const ContentListItem = ({ data }) => (
  <li>
    <Link to={`/${data.contentType}/${data.id}`}>
      <div dangerouslySetInnerHTML={{__html: data.html}}>
      </div>
      <div>            
        <span className="item-footer">
        </span>            
      </div>
    </Link>
  </li>
);

export default ContentListItem;
