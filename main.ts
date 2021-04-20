namespace SpriteKind {
    export const ball = SpriteKind.create()
    export const block = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (开始 == 0) {
        controller.moveSprite(ballcopy, 0, 0)
        ballcopy.setVelocity(30, -70)
        开始 = 1
    }
})
function hit (sprite: Sprite, otherSprite: Sprite) {
    if (sprite.x < otherSprite.x - 8 && sprite.y > otherSprite.y + 4 || sprite.x > otherSprite.x + 8 && sprite.y < otherSprite.y - 4) {
        sidehit = 3
    } else if (sprite.x < otherSprite.x - 8 && sprite.y < otherSprite.y - 4 || sprite.x > otherSprite.x + 8 && sprite.y > otherSprite.y + 4) {
        sidehit = 2
    } else if (sprite.x < otherSprite.x - 8 || sprite.x > otherSprite.x + 8) {
        sidehit = 1
    } else {
        sidehit = 0
    }
}
function 关卡 () {
    blockNum = 0
    blocks = [assets.image`myImage3`, assets.image`myImage2`, assets.image`myImage0`, assets.image`myImage`, assets.image`myImage1`]
    block_x = 24
    block_y = 16
    for (let index = 0; index <= 7; index++) {
        for (let index = 0; index <= 5; index++) {
            sprites.create(blocks[Math.constrain(index, 0, 4)], SpriteKind.block).setPosition(block_x, block_y)
            block_y += 8
            blockNum += 1
        }
        block_y = 16
        block_x += 16
    }
}
sprites.onOverlap(SpriteKind.ball, SpriteKind.block, function (sprite, otherSprite) {
    hit(sprite, otherSprite)
    if (sidehit == 3) {
        sprite.setVelocity(sprite.vy, sprite.vx)
    } else if (sidehit == 2) {
        sprite.setVelocity(-1 * sprite.vy, -1 * sprite.vx)
    } else if (sidehit == 1) {
        sprite.setVelocity(-1 * sprite.vx, sprite.vy)
    } else {
        sprite.setVelocity(sprite.vx, -1 * sprite.vy)
    }
    otherSprite.startEffect(effects.disintegrate)
    music.bigCrash.play()
    otherSprite.destroy()
    scene.cameraShake(2, 100)
    scene.setBackgroundColor(8)
    pause(30)
    scene.setBackgroundColor(15)
    pause(100)
    blockNum += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    if (ballcopy.x > mySprite.x - 8 || ballcopy.x < mySprite.x + 8) {
        ballcopy.vy = -1 * ballcopy.vy
        ballcopy.y = mySprite.y - 3
    } else {
        ballcopy.vx = -1 * ballcopy.vx
    }
    ballcopy.startEffect(effects.fountain, 100)
    music.knock.play()
})
let block_y = 0
let block_x = 0
let blocks: Image[] = []
let blockNum = 0
let sidehit = 0
let 开始 = 0
let ballcopy: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . 8 1 1 1 1 1 1 1 1 1 1 1 1 8 . 
    8 9 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
    8 9 8 9 8 9 8 9 8 9 8 9 8 9 8 8 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
ballcopy = sprites.create(img`
    1 d 
    d d 
    `, SpriteKind.ball)
mySprite.setPosition(76, 110)
ballcopy.setPosition(mySprite.x, 107)
mySprite.setStayInScreen(true)
ballcopy.setBounceOnWall(true)
controller.moveSprite(mySprite, 100, 0)
controller.moveSprite(ballcopy, 100, 0)
关卡()
开始 = 0
forever(function () {
    if (blockNum == 0) {
        game.over(true)
    }
    if (ballcopy.y >= 118) {
        game.over(false)
    }
})
