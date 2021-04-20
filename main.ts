namespace SpriteKind {
    export const ball = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite2.setVelocity(20, -50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    mySprite2.vy = 0 - mySprite2.vy
    mySprite2.startEffect(effects.fountain, 100)
    scene.cameraShake(2, 100)
})
let mySprite2: Sprite = null
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . 8 1 1 1 1 1 1 1 1 1 1 1 1 8 . 
    8 9 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
    8 9 8 9 8 9 8 9 8 9 8 9 8 9 8 8 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite2 = sprites.create(img`
    1 d 
    d d 
    `, SpriteKind.ball)
mySprite.setPosition(76, 110)
mySprite2.setPosition(mySprite.x, 107)
mySprite.setStayInScreen(true)
mySprite2.setBounceOnWall(true)
controller.moveSprite(mySprite, 100, 0)
let 开始 = 0
forever(function () {
	
})
