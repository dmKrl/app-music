/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import ItemPlaylist from '../UI/ItemPlaylist';
import * as S from './SectionMusicList.styles';
import bonesTracks from '../../data/tracks';
import { tracksAPI } from '../../services/GetAccessTokenService';
import {
  selectAuthorTrackFilter,
  selectGenreTrackFilter,
  selectNameTrackFilter,
  selectSortTrackFilter,
} from '../../redux/slices/filterSlice';

function SectionMusicList() {
  const {
    data: allTracks,
    isLoading,
    error,
  } = tracksAPI.useFetchAllTracksQuery();
  const nameTrackFilter = useSelector(selectNameTrackFilter);
  const sortTrackFilter = useSelector(selectSortTrackFilter);
  const authorTrackFilter = useSelector(selectAuthorTrackFilter);
  const genreTrackFilter = useSelector(selectGenreTrackFilter);
  console.log({ sortTrackFilter, authorTrackFilter, genreTrackFilter });

  const filteredTracks = allTracks?.filter((track) => {
    const matchesNameTrack = track.name
      .toLowerCase()
      .includes(nameTrackFilter.toLowerCase());
    const matchesAuthorTrack = !authorTrackFilter.length
      ? track
      : track.author.includes(
          authorTrackFilter.find((author) => author === track.author),
        );
    const matchesGenreTrack = !genreTrackFilter.length
      ? track
      : track.genre.includes(
          genreTrackFilter.find((genre) => genre === track.genre),
        );
    return matchesNameTrack && matchesAuthorTrack && matchesGenreTrack;
  });

  const filteredAndSortTracks = () => {
    console.log(sortTrackFilter.sort);
    if (sortTrackFilter.sort === 'сначала новые') {
      return filteredTracks
        .sort((a, b) => parseFloat(a.release_date) - parseFloat(b.release_date))
        .reverse();
    }
    if (sortTrackFilter.sort === 'сначала старые') {
      return filteredTracks.sort(
        (a, b) => parseFloat(a.release_date) - parseFloat(b.release_date),
      );
    }
    if (sortTrackFilter.sort === 'по умолчанию' || !sortTrackFilter.sort) {
      console.log(3);
      return filteredTracks;
    }
  };

  console.log(allTracks);
  return (
    <S.CenterBlockContent>
      <S.ContentTitle>
        <S.Col01>Трек</S.Col01>
        <S.Col02>ИСПОЛНИТЕЛЬ</S.Col02>
        <S.Col03>АЛЬБОМ</S.Col03>
        <S.Col04>
          <S.PlaylistTitleSvg alt="time">
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </S.PlaylistTitleSvg>
        </S.Col04>
      </S.ContentTitle>
      <S.ContentPlaylist>
        {error}
        {isLoading
          ? bonesTracks.map((track) => (
              <ItemPlaylist
                nameTrackFilter={nameTrackFilter}
                {...track}
                isLoading={isLoading}
                key={track.id}
              />
            ))
          : filteredAndSortTracks()?.map((track) => (
              <ItemPlaylist
                allTracks={allTracks}
                isLoading={isLoading}
                {...track}
                key={track.id}
              />
            ))}
      </S.ContentPlaylist>
    </S.CenterBlockContent>
  );
}

export default SectionMusicList;
