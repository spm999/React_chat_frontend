// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Join.css';

// const Join = () => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');

//   return (
//     <div className="joinOuterContainer">
//       <div className="joinInnerContainer">
//         <h1 className="heading"> Join </h1>
//         <div><input placeholder="Name" className="joinInput" name="name" type="text"  onChange={(event) => setName(event.target.value) }  required/></div>
//         <div><input placeholder="Room" className="joinInput mt-20" type="text" required onChange={(event) => setRoom(event.target.value)} ></input></div>
//         <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
//           <button className="button mt-20" type="submit" >
//             Sign In
//           </button>
//         </Link>
//       </div>
//     </div>

//   )
// }

// export default Join;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if both fields are filled out before navigating
    if (name && room) {
      navigate(`/chat?name=${name}&room=${room}`);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"> Join </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Name"
              className="joinInput"
              name="name"
              type="text"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
              required
            />
          </div>
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
