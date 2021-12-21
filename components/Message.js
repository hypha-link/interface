import React, { useState } from "react";
import styles from '../styles/Message.module.css';
import Image from "next/image";
import { TokenFeed } from "./TokenFeed";
import ContextMenu from "./ContextMenu";
import { useEthers } from "@usedapp/core";

export function Message(props) {
  const { account } = useEthers();
  const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});

  const urlRegex = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g);
  const message = props.postedData.message;

  const imgArr = [];
  const linkArr = [];
  const tokenFeedArr = [];
  const regularMessage = [];

  if(message.includes("ipfs")){
    imgArr.push(
      <Image key={message} src={message} alt={message} width="200px" height="200px" objectFit="contain"></Image>
    )
  }
  else if(message.match(urlRegex) !== null) {
    // let sel = message.match(urlRegex)[0];
    // const selStartIndex = message.indexOf(sel);
    // const selEndIndex = selStartIndex + message.length;
    // console.log(message.slice(0, selStartIndex));
    // console.log(message.slice(selEndIndex, message.length));
    const link = message.match(urlRegex);
    linkArr.push(
      <a key={link} href={link} target="_blank" rel="noreferrer">
        {link}
      </a>
    );
  }
  else if(message.startsWith("[") && message.endsWith("]")){
    tokenFeedArr.push(
      <TokenFeed
        key={1}
        onClick={() => console.log(message)}
        tokenName={message.substr(1, message.indexOf(",") - 1)}
        tokenPrice={message.substr(message.indexOf(",") + 1, message.length - message.indexOf(",") - 2)}
        hideLiveFeedCheckbox={false}
      />
    )
  }
  else{
    regularMessage.push(
      <p id={styles.messageText} key={message}>
        {message}
      </p>
    )
  }

  return (
    <div
      className={props.postedData.sender === account ? `${styles.message} ${styles.own}` : styles.message}
      onClick={() => props.clickMessage(props.postedData)}
      onContextMenu={(e) => {
            setTimeout(() => setAnchorPoint({x: e.pageX, y: e.pageY}), 1);
            e.preventDefault();
      }}
    >
      <ContextMenu 
      anchorPoint={{x: anchorPoint.x, y: anchorPoint.y}}
      localAnchorPoint={(ap) => setAnchorPoint(ap)}
      copy={() => {navigator.clipboard.writeText(props.postedData.message)}}
      delete={() => {props.deleteMessage(props.postedData)}}
      />
      <Image src={`https://robohash.org/${props.postedData.sender}.png?set=set5`} alt="User" height="100%" width="100%" objectFit="contain" />
      <div>
        <div>
          <p id={styles.messageID}>{props.postedData.sender}</p>
          <p id={styles.messageDate}>{props.postedData.date}</p>
        </div>
        {/* Message Content */}
        {imgArr}
        {linkArr}
        {tokenFeedArr}
        {regularMessage}
      </div>
    </div>
  );
}
