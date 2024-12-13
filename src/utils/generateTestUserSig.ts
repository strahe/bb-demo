interface Login {
  sdkAppId: number;
  userId: string;
  sdkSecretKey: string;
}

interface UserSig {
  userSig: string;
  sdkAppId: number;
}

export function genTestUserSig({ sdkAppId, userId, sdkSecretKey }: Login): UserSig {
  const EXPIRE = 604800;

  const generator = new (<any>window).LibGenerateTestUserSig(sdkAppId, sdkSecretKey, EXPIRE);
  const userSig = generator.genTestUserSig(userId);
  return {
    sdkAppId: sdkAppId,
    userSig: userSig
  };
}
