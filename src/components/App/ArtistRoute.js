import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestDataFetch,
  receiveDataFetch,
  receiveDataFetchError,
} from "../../actions";

import { TiMediaPlay } from "react-icons/ti";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  let currentArtist = useSelector((state) => state.artists.currentArtist);
  const { artistId } = useParams();

  const handleFetch = async () => {
    try {
      await dispatch(requestDataFetch());
      const response = await fetchArtistProfile(token, artistId);
      await dispatch(receiveDataFetch(response));
    } catch (err) {
      await dispatch(receiveDataFetchError());
    }
  };

  useEffect(() => {
    handleFetch();
  }, [token]);

  useEffect(() => {
    console.log(currentArtist);
  }, [currentArtist]);

  if (currentArtist) {
    currentArtist = currentArtist.profile;
  }

  let n = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <>
      <Wrapper>
        {currentArtist ? (
          <>
            <Header>
              <Image src={currentArtist.images[0].url} alt="profile photo" />
              <Name>{currentArtist.name}</Name>
            </Header>

            <Followers>
              {" "}
              <Span>{n.format(currentArtist.followers.total)}</Span> followers
            </Followers>
            <StyledTiMediaPlay />
            <Bottom>
              <Tags>Tags</Tags>
              <Genres>
                <GenreTag>{currentArtist.genres[0]}</GenreTag>
                <GenreTag> {currentArtist.genres[1]}</GenreTag>
              </Genres>
            </Bottom>
          </>
        ) : (
          <div> Loading !</div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background: #0b0f14;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  width: 100vh;
  height: 100vh;
  align-items: center;
  color: white;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 175px;
`;

const Image = styled.img`
  height: 175px;
  width: 175px;
  border-radius: 50%;
`;

const Name = styled.h1`
  font-weight: 600;
  font-size: 40px;
  position: absolute;
  bottom: 0px;
  margin: 0;
`;

const Followers = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const Span = styled.span`
  color: #ff4fd8;
`;

const StyledTiMediaPlay = styled(TiMediaPlay)`
  height: 25px;
  width: 25px;
  margin: 40px 0px 10px 0px;
`;

const Genres = styled.div`
  display: flex;
  justify-content: space-around;
  /* margin-top: 30px; */
`;

const GenreTag = styled.h1`
  font-size: 12px;
  background: rgba(75, 75, 75, 0.4);
  margin: 10px;
  padding: 8px;
  border-radius: 6px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Tags = styled.h1`
  font-size: 14px;
`;
export default ArtistRoute;
