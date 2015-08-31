#!/usr/bin/env ruby

Brade = 5

class Board
  attr_reader :name, :width, :depth, :price
  attr_reader :boards

  def initialize(name, width, depth, price)
    @name = name
    @width = width
    @depth = depth
    @price = price
    @boards = []
  end

  def concat(boards)
    @boards.concat(boards)
  end

  def push(*args)
    @boards.push(*args)
  end

  def pop
    @boards.pop
  end

  def cut?
    w = 0
    d = 0
    d_list = []
    @boards.each do |board|
      if w + board.width > @width
        d += d_list.max
        w = 0
        if d + board.depth > @depth
          return false
        end
      end
      d_list << board.depth
      w += board.width + Brade
    end
  end

  def cut!
    loop do
      return if cut?
      pop
    end
  end

  def dump
    @boards.map(&:dump).join(",")
  end
end

class TargetBoard
  attr_reader :width, :depth

  def initialize(width, depth)
    @width = width
    @depth = depth
  end

  def dump
    "<#{@width},#{@depth}>"
  end
end


def main
  a1 = Board.new("A", 900, 300, 1500)
  b1 = Board.new("B", 900, 450, 2000)
  c1 = Board.new("C", 1800, 900, 7500)
  d1 = Board.new("D", 2400, 900, 10000)

  wants = []
  12.times do
    wants << TargetBoard.new(760, 250)
  end
  18.times do
    wants << TargetBoard.new(760, 200)
  end
  6.times do
    wants << TargetBoard.new(680, 250)
  end
  6.times do
    wants << TargetBoard.new(1540, 200)
  end

  # wants = wants.shuffle

  d1.concat(wants)
  d1.cut!
  puts d1.dump
  d2 = Board.new("D", 2400, 900, 10000)
  wants -= d1.boards
  d2.concat(wants)
  d2.cut!
  puts d2.dump

  d3 = Board.new("D", 2400, 900, 10000)
  wants -= d2.boards
  d3.concat(wants)
  d3.cut!
  puts d3.dump

  d4 = Board.new("D", 2400, 900, 10000)
  wants -= d3.boards
  d4.concat(wants)
  d4.cut!
  puts d4.dump

  d5 = Board.new("D", 2400, 900, 10000)
  wants -= d4.boards
  d5.concat(wants)
  d5.cut!
  puts d5.dump

  wants -= d5.boards
  p wants
end

main
