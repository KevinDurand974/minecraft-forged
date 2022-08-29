import { createElement, FC, useCallback, useEffect, useRef } from "react";

interface Props {
  description: string;
}

const Description: FC<Props> = ({ description }) => {
  const parseDescriptionLinks = useCallback((description: string) => {
    const _dUri = (text: string) =>
      decodeURIComponent(decodeURIComponent(text));
    let desc = description;
    const matches = description.match(
      /href="\/linkout\?remoteUrl=([\w+\S]+)\"/gm
    );
    matches?.forEach(match => {
      desc = desc.replace(
        match,
        _dUri(
          match.replace(
            /href="\/linkout\?remoteUrl=([\w+\S]+)\"/,
            `href="$1" target="_blank"`
          )
        )
      );
    });
    return desc;
  }, []);

  const parseSpoilerDescription = useCallback((description: string) => {
    const desc = description.replace(
      /<\w{1,}\sclass\=\"spoiler/g,
      (match, index) => {
        const spoilerBtn = `<button id="spoiler-${index}" class="text-[1.2rem] text-normal text-center rounded-lg px-4 py-2 mb-2 bg-accent font-semibold">Spoiler (click to show)</button>\n`;
        const replacedMatch =
          match + ` hidden" attr-linkedto="spoiler-${index}"`;
        return spoilerBtn + replacedMatch;
      }
    );
    return desc;
  }, []);

  const handleSpoilerClick = useCallback((event: any) => {
    const spoilerAttr = event.target.getAttribute("id");
    const spoilerElement = document.querySelector(
      `[attr-linkedto="${spoilerAttr}"]`
    );
    if (spoilerElement) spoilerElement.classList.toggle("hidden");
  }, []);

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!descriptionRef.current) return;
    const descElement = descriptionRef.current;
    const spoilerArray = descElement.querySelectorAll("button[id^='spoiler-']");
    spoilerArray.forEach(spoiler => {
      spoiler.addEventListener("click", handleSpoilerClick);
    });

    return () => {
      spoilerArray.forEach(spoiler => {
        spoiler.removeEventListener("click", handleSpoilerClick);
      });
    };
  }, [descriptionRef]);

  return (
    <div
      ref={descriptionRef}
      dangerouslySetInnerHTML={{
        __html: parseSpoilerDescription(parseDescriptionLinks(description)),
      }}
      className="p-4 border-2 border-t-alt bg-t-alt bg-opacity-30 shadow-xs shadow-tertiary user-reset"
    />
  );
};

export default Description;
