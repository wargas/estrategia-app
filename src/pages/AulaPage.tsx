import {
  DefaultControls,
  DefaultSettings,
  DefaultUi,
  Player,
  Ui,
  Video,
} from "@vime/react";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaPlay } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Api from "../libs/Api";

import "@vime/core/themes/default.css";

type ResolucoesName = "240p" | "360p" | "480p" | "720p" | "1080p" | string;

type Video = {
  id: number;
  titulo: string;
  resolucao: ResolucoesName;
  resolucoes: Record<ResolucoesName, string>;
};

export default function AulaPage() {
  const { pacote_id, curso_id, id } = useParams();
  const [video, setVideo] = useState<Video>();

  const { data: aula, isLoading } = useQuery(["aula", id], async () => {
    const { data } = await Api.get(`aula/${id}`);

    return data?.data;
  });

  useEffect(() => {
    if (!video && aula?.videos) {
      setVideo(aula.videos[0]);
    }
  }, [video, aula]);

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {aula && (
        <div>
          <div className="flex items-center gap-3 border-b pb-3">
            <Link to={`/pacote/${pacote_id}/curso/${curso_id}`}>
              <FaChevronLeft />
            </Link>
            <div>
              <h1 className="font-bold text-2xl">{aula.nome}</h1>
              <span className="font-light text-sm">{aula.conteudo}</span>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-3 md:flex-row divide-x mt-3 shadow rounded-lg overflow-hidden">
            {!video ? (
              <div />
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="">
                  {aula.videos.map(
                    (_video: Video) =>
                      _video.id === video?.id && (
                        <Player
                          playbackRate={2}
                          playbackQuality={video.resolucao}
                          playbackQualities={Object.keys(video.resolucoes).map(q => q.replace('p', ''))}
                          theme="light"
                          onVmPlaybackQualityChange={() => {}}
                          autoplay
                        >
                          <Video>
                            <source
                              type="video/mp4"
                              src={video?.resolucoes["480p"]}
                            />
                          </Video>
                          <DefaultUi>
                            <DefaultSettings />
                            {/* <DefaultControls  /> */}
                          </DefaultUi>
                        </Player>
                      )
                  )}
                </div>

                <div className="p-3">{video.titulo}</div>
              </div>
            )}
            <div className="w-full md:w-[30%] lg:w-[25%]  flex flex-col divide-y">
              {aula.videos.map((_video: Video, index: number) => (
                <div
                  onClick={() => setVideo(_video)}
                  key={_video.id}
                  className={`flex p-2 items-center  gap-3 cursor-pointer ${
                    video?.id === _video.id
                      ? "bg-primary-500 text-white"
                      : "text-stone-700"
                  }`}
                >
                  <div className="">
                    <FaPlay />
                  </div>
                  <div>
                    <p className="text-sm font-light">
                      Video {index.toString().padStart(2, "0")}
                    </p>
                    <p>{_video.titulo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
