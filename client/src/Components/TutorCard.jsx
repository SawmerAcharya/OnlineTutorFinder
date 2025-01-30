import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { RiMessage2Fill } from "react-icons/ri";
import { FaBook, FaUser } from 'react-icons/fa'; 

function TutorCard({ tutor }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2, borderRadius: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
        alt={tutor.name}
        src={tutor.avatar}
        sx={{ width: 90, height: 90, mt: 2 }}  
      />
      <CardContent sx={{ width: '100%', textAlign: 'center' }}>
        <Typography gutterBottom variant="h6" component="div">
          {tutor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tutor.qualification}
        </Typography>
        <Typography sx={{ my: 1 }} color="text.secondary">
          {tutor.bio}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Rate: ${tutor.rate}/hrs
        </Typography>
        <Rating name="read-only" value={tutor.rating} precision={0.5} readOnly />
      </CardContent>
      <CardActions sx={{ width: '100%', justifyContent: 'space-around', pb: 2 }}>
      <div className="pt-4 pb-2">
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded shadow">
            <RiMessage2Fill className="mr-2" /> Message
          </button>
          <button className="flex items-center px-4 py-2 bg-red-500 text-white text-sm rounded shadow">
            <FaBook className="mr-2" /> Book
          </button>
          <button className="flex items-center px-4 py-2 bg-green-500 text-white text-sm rounded shadow">
            <FaUser className="mr-2" /> View Profile
          </button>
        </div>
      </div>
      </CardActions>
    </Card>
  );
}

export default TutorCard;
