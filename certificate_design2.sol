contract PostCert{
    event Posted(bytes32 hash);

    function Post(bytes32 hash) public {
        emit Posted(hash);
    }

}