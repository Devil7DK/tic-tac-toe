import "./AnonymousMultiplayer.scss";

import { signInAnonymously } from "firebase/auth";
import {
  equalTo,
  get,
  limitToFirst,
  onDisconnect,
  onValue,
  orderByChild,
  query,
  ref,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { auth, db } from "../../../Firebase";
import { GameGrid, showResult } from "../../../components";
import { getResult } from "../../../utils";

export const AnonymousMultiplayer = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Signing in anonymously...");

  const [roomId, setRoomId] = useState(null);

  const [assignedTurn, setAssignedTurn] = useState(null);
  const [turn, setTurn] = useState("X");
  const [values, setValues] = useState(() => new Array(9).fill(""));
  const [completed, setCompleted] = useState(false);

  const onGridClick = (index) => {
    const value = values[index];

    if (value || turn !== assignedTurn || completed) {
      return;
    }

    const newValues = [...values].map((value, valueIndex) =>
      index === valueIndex ? turn : value
    );

    const newTurn = turn === "X" ? "O" : "X";

    const roomRef = ref(db, `anonymous/${roomId}`);

    update(roomRef, {
      values: newValues,
      turn: newTurn,
    });
  };

  useEffect(() => {
    const result = getResult(values);

    if (result.winner || result.isDraw) {
      const roomRef = ref(db, `anonymous/${roomId}`);

      update(roomRef, {
        completed: true,
        isDraw: result.isDraw,
        winner: result.winner,
      });

      showResult(result);
    }
  }, [values]);

  useEffect(() => {
    let unsubscribeRoom = null;

    const subscribeRoom = (roomId) => {
      const roomRef = ref(db, `anonymous/${roomId}`);

      unsubscribeRoom = onValue(roomRef, (snapshot) => {
        const room = snapshot.val();

        if (!room) {
          return;
        }

        const { completed, values, turn, isDraw, winner } = room;

        setValues(values);
        setTurn(turn);
        setCompleted(completed);

        if (completed) {
          unsubscribeRoom();

          if (!isDraw && !winner) {
            showResult({ isDraw, winner });
          }
        }
      });
    };

    signInAnonymously(auth)
      .then(async (auth) => {
        setStatus("Finding a room...");

        const anonymousRef = ref(db, "anonymous");

        const existingRoom = await get(
          query(
            anonymousRef,
            orderByChild("player2"),
            equalTo(null),
            limitToFirst(1)
          )
        );

        if (
          existingRoom.exists() &&
          existingRoom.size > 0 &&
          Object.values(existingRoom.val())[0].player1 !== auth.user.uid
        ) {
          const roomId = Object.keys(existingRoom.val())[0];

          const roomRef = ref(db, `anonymous/${roomId}`);

          await update(roomRef, {
            player2: auth.user.uid,
            player2Online: true,
          });

          await onDisconnect(ref(db, `anonymous/${roomId}/player2Online`)).set(
            false
          );
          await onDisconnect(ref(db, `anonymous/${roomId}/completed`)).set(
            true
          );

          subscribeRoom(roomId);

          setRoomId(roomId);
          setAssignedTurn("O");
          setLoading(false);
        } else {
          const roomId = uuid();

          const roomRef = ref(db, `anonymous/${roomId}`);

          await set(roomRef, {
            player1: auth.user.uid,
            player1Online: true,
            player2: null,
            player2Online: false,
            completed: false,
            values: new Array(9).fill(""),
            turn: "X",
            isDraw: false,
            winner: null,
          });

          await onDisconnect(ref(db, `anonymous/${roomId}/player1Online`)).set(
            false
          );
          await onDisconnect(ref(db, `anonymous/${roomId}/completed`)).set(
            true
          );

          setRoomId(roomId);
          setAssignedTurn("X");
          setStatus("Waiting for another player...");

          const player2Ref = ref(db, `anonymous/${roomId}/player2`);

          const unsubscribe = onValue(player2Ref, (snapshot) => {
            const player2 = snapshot.val();

            if (player2) {
              subscribeRoom(roomId);
              setLoading(false);

              if (unsubscribe) {
                unsubscribe();
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Failed to sign in anonymously", error);
        alert("Failed to sign in anonymously");
        navigate("/");
      });

    return () => {
      if (unsubscribeRoom) {
        unsubscribeRoom();
      }
    };
  }, []);

  return (
    <div className="game-container anonymous-multiplayer">
      <h2>You are playing as: {assignedTurn}</h2>
      <h2>Current Player: {turn}</h2>

      <GameGrid values={values} onClick={onGridClick} />

      {loading && (
        <div className="loading-overlay">
          <div className="status-text">{status}</div>
        </div>
      )}
    </div>
  );
};
