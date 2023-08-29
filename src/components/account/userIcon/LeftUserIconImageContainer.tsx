import './LeftUserIconImageContainer.css';
interface ContainerProps { }

const LeftUserIconImageContainer: React.FC<ContainerProps> = () => {

    return (
        <div id="container" className={'container-img-user'}>
            <img id="img" className={'img-user-right'} alt="userIconImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5TAP9bkSK1AAACaklEQVR4nO3Xy3GDMBAAUDQ66EgJaiQTWkoBHovSKEUlcOTAWIkRrPY7wY4nJ3MJ4WFptejbde/r3OVLuemSSimLBqHcr9H4SSmzWsv8o0pN/VaHVlwqtTJRnNvDKquMrBYTC5d4OwKZeDVH+SUzgVcjS4OH4gNrUVjlO3sZrRmsrUOLaKAhpPZiJFlwqNpAgvOrfk/fcyTsHtdKwo4T+mcYrX/oa2bRVxIObhAJ1CNxtHGLJQ43m3YYJCETQfGEiUhqtz0V1Lp+JBJH7ZYLAVz4YMonlZAt8U0uTObHxTVh3R+lns8Pzwh8IMdH+uWlcjXl84RkS/wrZDAlvuWMiC/3N+F9tI1OLmf6jinelJCZXH8XNlWhscCmKiSRC4xGNiEhuXJZfhe+VEOGRaohW0IgWyJt8CBkLtkSeCDSBouBEHgg0gZLIJvh0asiofBApM0WeCD2PjdT4IFI9WKJN6Wt23wzF/Jxh/Yt29V2AYl9ubZzGFjYbYPRs4paHvkeCy3bTFAR7AOtljhT8DaEflTcMeniHGzJ7Z4uwbj72ZKI4I6ZJksGKvg+Y8Gt600h2z/SOjpMbMHdnA46LIFEgDNCJwQszpRuxn/V3yznxduyR+1M8SKCYwYKptSvoUmUMta/9atrUk8kirg6jhTZTz5KBPtpSZF99BOZazWTkHp66feBTGR7lm5S3P0M549TKxln99NkOk50ROJ2aO0U2Q66iybdXSZVfoqDmYNt0Id2xGTS9bMlbbbhC0ibvsWis5pyeUI+TIFgxYIIIvYe/y+TJYHLhymXP0l+XMRe15blpfIFd1P3vur1DRWGO64MjoCiAAAAAElFTkSuQmCC"/>
        </div>
    );
};

export default LeftUserIconImageContainer;
