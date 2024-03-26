/*
 * @Date: 2021-11-25 13:55:40
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 21:22:05
 * @FilePath: \graduation-project\vue-czhalgo-web\src\views\sort\MergeSort\animation.js
 */
import Animation from '@/animation'

class MergeSortAnimation extends Animation {
  data = {}

  get AnimOption() {
    const {
      stage,
      state
    } = this
    return {
      duration: state.speed,
      onChange() {
        stage.renderAll()
      }
    }
  }

  created() {
    const {
      $,
      stage,
      anim,
      state,
      action
    } = this
    // this.setCursor()
    // doSomeThing
  }

  /** 动画方法**/

  // 执行方法

  // 动画执行
  doAnim() {
    // doSomething
  }

  // 代码动画
  doCode() {
    // doSomething
  }

  // 初始化代码动画
  initCode() {
    // doSomething
  }
}

export default MergeSortAnimation
