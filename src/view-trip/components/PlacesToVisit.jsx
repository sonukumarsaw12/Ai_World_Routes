import React from 'react'
import PlaceCarditem from './PlaceCarditem';

function PlacesToVisit({ trip }) {
  return (
    <div className='mt-6'>
      <h2 className='font-bold text-lg'>Places To Visit</h2>
      <div>
        {trip?.TripData?.travelPlan?.itinerary?.map((item, index) => (
          <div key={index} className='mt-3'>
            <h2 className='font-medium text-lg'>Day {item.day}</h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {item.activities.map((place, index) => (
                <div className='my-3'>
                  <h2 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit}</h2>
                  {/* <h2>{place.placeName}</h2> */}
                  <PlaceCarditem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default PlacesToVisit;
