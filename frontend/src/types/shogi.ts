import type React from "react"

export type PageType = {
    title: string,
    nextPage?: React.ReactNode,
    backPage?: React.ReactNode,
    shogiBoard?: React.ReactNode
}

export type ShogiBoardProps = {
    config: {
        firstPlayer: string;
        secondPlayer: string;
        handicap: string;
        handicapSide: string;
        handicapType: string;
    };
};