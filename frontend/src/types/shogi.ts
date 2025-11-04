import type { ReactNode } from "react";

export type Player = 'first' | 'second';

export type PieceType =
  | '歩兵' 
  | '香車' 
  | '桂馬' 
  | '銀将' 
  | '金将' 
  | '角行' 
  | '飛車' 
  | '王将' 
  | '玉将' 
  | 'と金' 
  | '成香' 
  | '成桂' 
  | '成銀' 
  | '竜馬' 
  | '竜王';

export interface Piece {
  type: PieceType;
  player: Player;
}

export type Square = Piece | null;

export type BoardState = Square[][];

export type ShogiBoardProps = {
    config: {
        firstPlayer: string;
        secondPlayer: string;
        handicap: string;
        handicapSide: string;
        handicapType: string;
    };
};

export type PageType = {
    title: string;
    nextPage?:ReactNode
    backPage?:ReactNode; 
    shogiBoard?:ReactNode;
}